export interface Session {
  id: string;
  user_id: string;
  token: string;
  device_type: 'web' | 'mobile' | 'agent';
  device_name: string;
  device_id: string;
  ip_address?: string;
  user_agent?: string;
  is_active: boolean;
  created_at: string;
  expires_at: string;
  last_activity: string;
  ended_at?: string;
  end_reason?: string;
}

export interface SessionResponse {
  sessions: Session[];
  current_session_id: string;
}

export interface SessionCreate {
  user_id: string;
  device_type: 'web' | 'mobile' | 'agent';
  device_name: string;
  user_agent?: string;
  ip_address?: string;
}

export interface SessionValidation {
  user: any;
  session: Session;
}