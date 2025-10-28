import React, { useState, useEffect } from 'react';

const ContactForm = ({ 
  showEmail = false, 
  title = "צור קשר",
  containerClassName = "",
  containerStyle = {},
  titleClassName = "",
  titleStyle = {},
  formClassName = "",
  formStyle = {},
  formGroupClassName = "",
  formGroupStyle = {},
  labelClassName = "",
  labelStyle = {},
  inputClassName = "",
  inputStyle = {},
  textareaClassName = "",
  textareaStyle = {},
  buttonClassName = "",
  buttonStyle = {},
  feedbackClassName = "",
  feedbackStyle = {},
  successClassName = "",
  successStyle = {},
  errorClassName = "",
  errorStyle = {},
  requiredClassName = "",
  requiredStyle = {},
  // New props for global form handling
  isGlobalHandler = false,
  targetFormSelector = null
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzpMUn7YTDOnJ3KH_J2nM_j1rwANL1Yf_q9gyMuiikkqWOD1zTsT0V0N3X9AqW5V7va/exec';
  const SECRET_KEY = "MY_SECRET_KEY";

  // Global form handler setup
  useEffect(() => {
    if (isGlobalHandler) {
      const handleGlobalSubmit = async (e) => {
        // Check if this is a submit button click
        if (e.target.type === 'submit' || e.target.classList.contains('submit-btn')) {
          e.preventDefault();
          
          // Find the form that contains this button
          const form = e.target.closest('form');
          if (!form) return;
          
          // Collect form data
          const formData = new FormData(form);
          const data = {
            name: formData.get('name') || formData.get('fullName') || '',
            phone: formData.get('phone') || '',
            email: formData.get('email') || '',
            message: formData.get('message') || ''
          };
          
          // Show immediate feedback
          e.target.textContent = 'נשלח!';
          e.target.disabled = true;
          e.target.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
          
          // Submit data in background
          try {
            await submitFormData(data);
            // Keep the success state
          } catch (error) {
            // Reset button on error
            e.target.textContent = 'שלח';
            e.target.disabled = false;
            e.target.style.background = 'linear-gradient(135deg, #007AFF 0%, #0051D5 100%)';
            console.error('Form submission error:', error);
          }
        }
      };
      
      // Add event listener to document
      document.addEventListener('click', handleGlobalSubmit);
      
      return () => {
        document.removeEventListener('click', handleGlobalSubmit);
      };
    }
  }, [isGlobalHandler]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (feedback.type === 'error') {
      setFeedback({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push('שם הוא שדה חובה');
    } else if (formData.name.trim().length < 2) {
      errors.push('שם חייב להכיל לפחות 2 תווים');
    }

    if (!formData.phone.trim()) {
      errors.push('מספר טלפון הוא שדה חובה');
    } else if (!/^[0-9\-\+\s\(\)]{9,}$/.test(formData.phone.trim())) {
      errors.push('מספר טלפון לא תקין');
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.push('כתובת מייל לא תקינה');
    }

    return errors;
  };

  // Global form submission function
  const submitFormData = async (data) => {
    const params = new URLSearchParams();
    params.append('name', data.name.trim());
    params.append('phone', data.phone.trim());
    params.append('email', data.email.trim() || '');
    params.append('message', data.message.trim() || '');
    params.append('secret', SECRET_KEY);

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: params,
    });

    const result = await response.json();

    if (result.result !== 'success') {
      throw new Error(result.message || 'שגיאה בשליחת הפנייה');
    }

    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      setFeedback({
        type: 'error',
        message: errors.join(', ')
      });
      return;
    }

    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      const params = new URLSearchParams();
      params.append('name', formData.name.trim());
      params.append('phone', formData.phone.trim());
      params.append('email', formData.email.trim() || '');
      params.append('message', formData.message.trim() || '');
      params.append('secret', SECRET_KEY);

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: params,
      });

      const result = await response.json();

      if (result.result === 'success') {
        setFeedback({
          type: 'success',
          message: result.message || 'הפנייה נשלחה בהצלחה! נחזור אליך בקרוב.'
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error(result.message || 'שגיאה בשליחת הפנייה');
      }

    } catch (error) {
      console.error('Form submission error:', error);
      setFeedback({
        type: 'error',
        message: 'אירעה שגיאה בשליחת הפנייה. אנא נסה שוב מאוחר יותר.'
      });
    } finally {
      setLoading(false);
    }
  };

  // If this is a global handler, don't render anything
  if (isGlobalHandler) {
    return null;
  }

  return (
    <div className={containerClassName} style={containerStyle}>
      {title && (
        <h2 className={titleClassName} style={titleStyle}>
          {title}
        </h2>
      )}
      
      {feedback.message && (
        <div 
          className={`${feedbackClassName} ${feedback.type === 'success' ? successClassName : errorClassName}`}
          style={{
            ...feedbackStyle,
            ...(feedback.type === 'success' ? successStyle : errorStyle)
          }}
        >
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className={formClassName} style={formStyle}>
        <div className={formGroupClassName} style={formGroupStyle}>
          <label className={labelClassName} style={labelStyle}>
            שם <span className={requiredClassName} style={requiredStyle}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputClassName}
            style={inputStyle}
            placeholder="השם שלך"
            required
          />
        </div>

        <div className={formGroupClassName} style={formGroupStyle}>
          <label className={labelClassName} style={labelStyle}>
            טלפון <span className={requiredClassName} style={requiredStyle}>*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={inputClassName}
            style={inputStyle}
            placeholder="מספר הטלפון"
            required
          />
        </div>

        {showEmail && (
          <div className={formGroupClassName} style={formGroupStyle}>
            <label className={labelClassName} style={labelStyle}>
              מייל (רשות)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={inputClassName}
              style={inputStyle}
              placeholder="your@email.com"
            />
          </div>
        )}

        <div className={formGroupClassName} style={formGroupStyle}>
          <label className={labelClassName} style={labelStyle}>
            הודעה נוספת (רשות)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={textareaClassName}
            style={textareaStyle}
            placeholder="ספר לנו איך נוכל לעזור לך..."
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={buttonClassName}
          style={buttonStyle}
        >
          {loading ? 'שולח...' : 'שלח פנייה'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;