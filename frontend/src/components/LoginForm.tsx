
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialogFooter } from '@/components/ui/alert-dialog';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
        />
      </div>
      
      <AlertDialogFooter className="flex-col sm:justify-start pt-4">
        <Button 
          type="submit" 
          className="w-full mb-2" 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Sign in'}
        </Button>
        <div className="flex justify-center w-full">
          <Button 
            type="button" 
            variant="link" 
            onClick={onSwitchToRegister}
            className="text-sm"
          >
            Don't have an account? Register
          </Button>
        </div>
      </AlertDialogFooter>
    </form>
  );
};

export default LoginForm;
