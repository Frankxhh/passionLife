import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className={'flex h-full w-full justify-center pt-[10%]'}>
      <SignIn />
    </div>
  );
}
