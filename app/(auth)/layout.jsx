export default function AuthLayout({ children }) {
  return (
    <div className='flex h-screen w-screen items-center justify-center pt-40'>
      {children}
    </div>
  );
}
