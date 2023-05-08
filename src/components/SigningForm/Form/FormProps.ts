export interface InputsProps {
    label: string,
    id: string,
    type: string,
    placeholder: string,
  }

export const Inputs: Array<InputsProps> = [
    {
      label: "First Name",
      id: "name",
      type: "test",
      placeholder: "Jerry",
    },
    {
      label: "Last Name",
      id: "lastName",
      type: "test",
      placeholder: "Smith",
    },
    {
      label: "Email",
      id: "email",
      type: "text",
      placeholder: "example@domain.com",
    }
];