import React, { useState, useEffect } from 'react';
import { Input, Button, VStack, Text, FormControl, FormLabel } from '@chakra-ui/react';
import { openDatabase, addPasswordToDatabase, encryptPassword } from '@/utils/password';

interface IProps {
  callback: () => void;
}
const PasswordSetter: React.FC<IProps> = ({ callback }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError('');
    }
  }, [password, confirmPassword]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: mock , save indexDB

    callback()

    // if (error) {
    //   return;
    // }

    // const { key, encryptedData } = await encryptPassword(password);
    // await addPasswordToDatabase(encryptedData);
    // alert('Password set successfully');
    // setPassword('');
    // setConfirmPassword('');
  }

  return (
    <VStack align="stretch" spacing={6} width="100%">
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input placeholder="Enter password" type="password" value={password} onChange={(e) => handleChange(e, setPassword)} />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input placeholder="Confirm password" type="password" value={confirmPassword} onChange={(e) => handleChange(e, setConfirmPassword)} />
      </FormControl>
      {error && <Text color="red.500">{error}</Text>}
      <Button colorScheme="blue" onClick={handleSubmit}>Set Password</Button>
    </VStack>
  )
}

export default PasswordSetter;
