const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:flex md:min-h-[520px]">        {children}
      </div>
    </div>
  );
};

export default AuthLayout;