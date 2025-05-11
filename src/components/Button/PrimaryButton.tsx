interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <div className="flex justify-center">
      <button
        type="submit" // Use "button" type to avoid accidental form submission
        onClick={onClick}
        className={`${className} text-background bg-primary hover:text-accent relative flex cursor-pointer items-center overflow-hidden rounded-full px-6 py-2 text-base font-bold shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-8 sm:text-lg md:px-10 lg:px-12`}
      >
        {children}
      </button>
    </div>
  );
};

export default PrimaryButton;
