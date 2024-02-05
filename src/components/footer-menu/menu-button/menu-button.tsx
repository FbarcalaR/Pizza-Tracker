type IProps = {
    active?: boolean;
    children: React.ReactNode;
  }
  
  export default function MenuButton({ children, active = true }: IProps) {
    return (
      <button className={`w-9 h-9 ${active && 'pointer-events-none'}`}>
        {children}
      </button>
    );
  }
  