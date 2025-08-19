import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { media } from '../styles/media'
// import { Button } from '../styles/media';
import { Button } from './Button';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  input, textarea {
    padding: ${({ theme }) => theme.spacing.sm};
  }

  ${media.md} {
    max-width: 600px;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const FeedbackMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
`;

const ContactUsForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm();
  const [ success, setSuccess ] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/contact`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    alert('Your message has been sent successfully!');    
    reset();
    setSuccess(true);

    } catch (error) {
      console.error(error);
      setError('root', { message: 'Failed to send your message. Please try again later.'});
      alert('Failed to send your message. Please try again later.');
      setSuccess(false);
    }
  };

  if (success) {
    return (
      <FeedbackMessage>
        <h2>Thanks! 🎉</h2>
        <p>Your message has been sent. We’ll get back to you soon.</p>
      </FeedbackMessage>
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Your Name"
        {...register('name', { required: 'Name is required' })}
      />
      {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

      <input
        type='email'
        placeholder='Your Email'
        {...register("email", {
          required: 'Email is required',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' }
        })}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <input
        type='phone'
        placeholder='Your Phone'
        {...register('phone', { required: false })}
      />
      {errors.root && <ErrorText>{errors.root.message}</ErrorText>}

      <input
        type='text'
        placeholder='Subject'
        {...register('subject', { required: false })}
      />

      <textarea
        placeholder='Your Message'
        rows={6}
        {...register('message', { required: 'Please write a message' })}
      />
      {errors.message && <ErrorText>{errors.message.message}</ErrorText>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </StyledForm>
  );
};

export default ContactUsForm;