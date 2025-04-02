export default function Footer() {
  return (
    <footer className='bg-gray-900 py-12'>
      <div className='container mx-auto text-center flex flex-col items-center space-y-2'>
        <p className='text-center text-muted-foreground text-xs'>
          Copyright &copy; {new Date().getFullYear()}
        </p>
        <p className='text-center text-muted-foreground text-xs'>
          Created by The Web Architech
        </p>
      </div>
    </footer>
  );
}
