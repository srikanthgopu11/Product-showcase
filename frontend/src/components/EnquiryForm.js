import React, { useState } from 'react';

const EnquiryForm = ({ productId, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState(null); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            const response = await fetch('http://localhost:3001/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, product_id: productId })
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(onClose, 2000); 
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'success') return <div className="modal-content success">Thank you! Enquiry sent.</div>;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Send Enquiry</h3>
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name *" required onChange={handleChange} />
                    <input name="email" type="email" placeholder="Email *" required onChange={handleChange} />
                    <input name="phone" placeholder="Phone (Optional)" onChange={handleChange} />
                    <textarea name="message" placeholder="Message *" required onChange={handleChange}></textarea>
                    
                    <button type="submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Sending...' : 'Submit'}
                    </button>
                    <button type="button" className="close-btn" onClick={onClose}>Cancel</button>
                </form>
                {status === 'error' && <p className="error">Failed to send. Try again.</p>}
            </div>
        </div>
    );
};

export default EnquiryForm;