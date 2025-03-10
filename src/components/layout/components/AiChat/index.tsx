import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { useState } from 'react';
import AiChatContent from './component/AiChatContent';

const AiChat = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={open => setOpen(open)} autoFocus={open}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bot />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[calc(100vh-64px)] p-4">
        <DrawerHeader>
          <DrawerTitle>Cal LightMan</DrawerTitle>
        </DrawerHeader>
        <AiChatContent />
      </DrawerContent>
    </Drawer>
  );
};

export default AiChat;
