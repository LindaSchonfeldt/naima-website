import { useForm } from 'react-hook-form';
import styled from 'styled-components';

// import { Button } from '../styles/media';
import { Button } from './Button';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  input, textarea {
    padding: ${(props) => props.theme.spacing.sm};
  }
`

const ContactUsForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Replace with API call to backend
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Your Name"
        {...register('name', { required: true })}
      />
      <input
        type="email"
        placeholder="Your Email"
        {...register('email', { required: true })}
      />
      <textarea
        placeholder="Your Message"
        {...register('message', { required: true })}
      />
      <Button type="submit">Send Message</Button>
    </StyledForm>
  );
};

export default ContactUsForm;