import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";
import "./CircularGallery.css";

// ========================================================================================
// UTILITY FUNCTIONS
// ========================================================================================
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(gl, text, font = "bold 30px 'Varela Round', sans-serif", color = "black") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

// ========================================================================================
// TITLE CLASS - Handles text labels below cards
// ========================================================================================
class Title {
  constructor({ gl, plane, renderer, text, textColor = "#545050", font = "30px sans-serif" }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }
  
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;

          // Enhanced shadow with multiple layers
          vec2 shadowOffset1 = vec2(0.003, -0.003);
          vec2 shadowOffset2 = vec2(0.006, -0.006);
          vec2 shadowOffset3 = vec2(0.009, -0.009);

          vec4 shadow1 = texture2D(tMap, vUv + shadowOffset1);
          vec4 shadow2 = texture2D(tMap, vUv + shadowOffset2);
          vec4 shadow3 = texture2D(tMap, vUv + shadowOffset3);

          shadow1.rgb = vec3(0.0);
          shadow2.rgb = vec3(0.0);
          shadow3.rgb = vec3(0.0);

          shadow1.a *= 0.8;
          shadow2.a *= 0.6;
          shadow3.a *= 0.4;

          // Combine shadows
          vec4 combinedShadow = shadow3;
          combinedShadow = mix(combinedShadow, shadow2, shadow2.a);
          combinedShadow = mix(combinedShadow, shadow1, shadow1.a);

          // Add subtle glow to text
          color.rgb = color.rgb * 1.15;

          // Final composition
          color = mix(combinedShadow, color, color.a);
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.2;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.3; // הקטנו את המרחק מהכרטיס
    this.mesh.position.z = 0.1;
    this.mesh.setParent(this.plane);
  }
}

// ========================================================================================
// MEDIA CLASS - Handles individual cards
// ========================================================================================
class Media {
  constructor({
    geometry, gl, image, index, length, renderer, scene, screen,
    text, viewport, bend, textColor, font
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float borderWidth = 0.03;
          float cornerRadius = 0.1;
          
          vec2 borderDist = min(vUv, 1.0 - vUv);
          float minDist = min(borderDist.x, borderDist.y);
          
          vec2 corner = max(vec2(cornerRadius) - vUv, vec2(0.0));
          corner = max(corner, vUv - vec2(1.0 - cornerRadius));
          float cornerDist = length(corner);
          float roundedBorder = 1.0 - smoothstep(cornerRadius - borderWidth, cornerRadius, cornerDist);
          
          float glassFrame = smoothstep(0.0, borderWidth, minDist);
          float frameGlow = 1.0 - smoothstep(0.0, borderWidth * 2.0, minDist);
          float timeGlow = 0.8;
          
          vec3 glassColor = vec3(0.9, 0.95, 1.0);
          float glassAlpha = frameGlow * 0.4 * timeGlow;
          
          vec3 finalColor = mix(glassColor, color.rgb, glassFrame * roundedBorder);
          finalColor += frameGlow * glassColor * 0.3 * timeGlow;
          
          float innerShadow = smoothstep(0.0, 0.08, minDist);
          finalColor *= 0.8 + innerShadow * 0.2;
          
          float edgeGlow = pow(frameGlow, 2.0) * timeGlow * 0.6;
          finalColor += edgeGlow * vec3(0.7, 0.9, 1.0);
          
          float finalAlpha = max(glassFrame * roundedBorder, glassAlpha);
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uTime: { value: 0 },
      },
      transparent: true,
    });
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }
  
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }
  
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      fontFamily: this.font,
    });
  }
  
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    
    // Fixed card sizes for better control
    const cardPixelHeight = 300; // Actual card height in pixels
    const cardPixelWidth = 260; // Actual card width in pixels
    
    // Convert pixel sizes to viewport units
    this.plane.scale.y = (this.viewport.height * cardPixelHeight) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * cardPixelWidth) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    
    this.padding = 0.8; // Reduced padding between cards
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
  
  // New method to check if point is over this media
  isPointOver(worldX, worldY) {
    const halfWidth = this.plane.scale.x / 2;
    const halfHeight = this.plane.scale.y / 2;
    return Math.abs(worldX - this.plane.position.x) < halfWidth && 
           Math.abs(worldY - this.plane.position.y) < halfHeight;
  }
}

// ========================================================================================
// APP CLASS - Main gallery controller
// ========================================================================================
class App {
  constructor(container, {
    items, bend, textColor = "#ffffff", font = "bold 30px 'Varela Round', sans-serif",
    scrollSpeed = 2, scrollEase = 0.05
  } = {}) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.isVisible = true;
    this.isPlaying = true;
    this.isDown = false;
    
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, font);
    this.addEventListeners();
    this.update();
  }
  
  createRenderer() {
    this.renderer = new Renderer({ 
      alpha: true,
      antialias: true,
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 22; // הרחקנו מעט את המצלמה
  }
  
  createScene() {
    this.scene = new Transform();
  }
  
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }
  
  createMedias(items, bend = 1, textColor, font) {
    const defaultItems = [
      { image: `https://picsum.photos/seed/1/800/600`, text: "Bridge" },
      { image: `https://picsum.photos/seed/2/800/600`, text: "Desk Setup" },
      { image: `https://picsum.photos/seed/3/800/600`, text: "Waterfall" },
      { image: `https://picsum.photos/seed/4/800/600`, text: "Strawberries" },
      { image: `https://picsum.photos/seed/5/800/600`, text: "Deep Diving" },
      { image: `https://picsum.photos/seed/16/800/600`, text: "Train Track" },
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        font,
      });
    });
  }
  
  onTouchDown(e) {
    // Check if click is on a card
    const rect = this.gl.canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    
    const worldX = (x / this.screen.width - 0.5) * this.viewport.width;
    const worldY = -(y / this.screen.height - 0.5) * this.viewport.height;
    
    // Only start drag if clicking on a card
    const isOnCard = this.medias?.some(media => media.isPointOver(worldX, worldY));
    if (!isOnCard) return;
    
    e.preventDefault();
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    const touch = e.touches ? e.touches[0] : e;
    this.start = touch.clientX;
  }
  
  onTouchMove(e) {
    if (!this.isDown) return;
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    const distance = (this.start - touch.clientX) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }
  
  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }
  
  onWheel(e) {
    // Check if mouse is over a card
    const rect = this.gl.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to world coordinates
    const worldX = (x / this.screen.width - 0.5) * this.viewport.width;
    const worldY = -(y / this.screen.height - 0.5) * this.viewport.height;
    
    // Check if over any card
    const isOverCard = this.medias?.some(media => media.isPointOver(worldX, worldY));
    if (!isOverCard) return;
    
    // Check for horizontal scroll or shift key
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const isHoldingShift = e.shiftKey;
    
    if (!isHorizontalScroll && !isHoldingShift) return;
    
    e.preventDefault();
    const delta = isHorizontalScroll ? e.deltaX : e.deltaY;
    this.scroll.target += delta * 0.01 * this.scrollSpeed;
    this.onCheckDebounce();
  }
  
  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ 
        screen: this.screen, 
        viewport: this.viewport 
      }));
    }
  }
  
  update() {
    if (!this.renderer || !this.scene || !this.camera || !this.isPlaying) return;
    
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    requestAnimationFrame(this.update.bind(this));
  }
  
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    
    window.addEventListener("resize", this.boundOnResize);
    this.container.addEventListener("wheel", this.boundOnWheel, { passive: false });
    this.container.addEventListener("mousedown", this.boundOnTouchDown);
    this.container.addEventListener("mousemove", this.boundOnTouchMove);
    this.container.addEventListener("mouseup", this.boundOnTouchUp);
    this.container.addEventListener("touchstart", this.boundOnTouchDown, { passive: false });
    this.container.addEventListener("touchmove", this.boundOnTouchMove, { passive: false });
    this.container.addEventListener("touchend", this.boundOnTouchUp);
  }
  
  destroy() {
    this.isPlaying = false;
    
    window.removeEventListener("resize", this.boundOnResize);
    
    if (this.container) {
      this.container.removeEventListener("wheel", this.boundOnWheel);
      this.container.removeEventListener("mousedown", this.boundOnTouchDown);
      this.container.removeEventListener("mousemove", this.boundOnTouchMove);
      this.container.removeEventListener("mouseup", this.boundOnTouchUp);
      this.container.removeEventListener("touchstart", this.boundOnTouchDown);
      this.container.removeEventListener("touchmove", this.boundOnTouchMove);
      this.container.removeEventListener("touchend", this.boundOnTouchUp);
    }
    
    if (this.renderer && this.renderer.gl) {
      if (this.renderer.gl.canvas.parentNode) {
        this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
      }
      this.renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
    
    this.renderer = null;
    this.gl = null;
    this.scene = null;
    this.camera = null;
    this.container = null;
  }
}

// ========================================================================================
// MAIN COMPONENT
// ========================================================================================
export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  font = "bold 30px 'Varela Round', sans-serif",
  scrollSpeed = 2,
  scrollEase = 0.05,
}) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const app = new App(containerRef.current, { 
      items, bend, textColor, font, scrollSpeed, scrollEase 
    });
    return () => app.destroy();
  }, [items, bend, textColor, font, scrollSpeed, scrollEase]);
  
  return <div className="circular-gallery" ref={containerRef} />;
}
