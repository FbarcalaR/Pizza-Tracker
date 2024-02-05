type IProps = {
  children: React.ReactNode;
}

export default function MainButton({ children }: IProps) {
  return (
    <button className="w-full h-auto bg-main-color text-main-text p-3 size-4 font-bold leading-4 rounded-md">
      {children}
    </button>
  );
}
