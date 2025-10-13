import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';

interface UserPillProps {
  name: string;
  email?: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UserPill = ({ name, email, avatar, size = 'md' }: UserPillProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={avatar} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        {email && <span className="text-sm text-gray-500">{email}</span>}
      </div>
    </div>
  );
};

export default UserPill;

