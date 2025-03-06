
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialogFooter } from '@/components/ui/alert-dialog';

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    await register(name, email, password);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <label htmlFor="name-popup" className="text-sm font-medium">Full Name</label>
        <Input
          id="name-popup"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email-popup" className="text-sm font-medium">Email</label>
        <Input
          id="email-popup"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password-popup" className="text-sm font-medium">Password</label>
        <Input
          id="password-popup"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          minLength={6}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword-popup" className="text-sm font-medium">Confirm Password</label>
        <Input
          id="confirmPassword-popup"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
      </div>
      
      <AlertDialogFooter className="flex-col sm:justify-start pt-4">
        <Button 
          type="submit" 
          className="w-full mb-2" 
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Register'}
        </Button>
        <div className="flex justify-center w-full">
          <Button 
            type="button" 
            variant="link" 
            onClick={onSwitchToLogin}
            className="text-sm"
          >
            Already have an account? Login
          </Button>
        </div>
      </AlertDialogFooter>
    </form>
  );
};

export default RegisterForm;
