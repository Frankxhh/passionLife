import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import AddTrainingForm from '@/components/training/addTrainingForm';
const AddTrainingPage = () => {
  return (
    <div className="container mx-auto max-w-2xl">
      <Link href="/training" className="mb-4">
        <Button variant="ghost">
          <ArrowLeft size={16} />
          返回
        </Button>
      </Link>
      <Tabs defaultValue="aerobics">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aerobics">
            <Image src="/image/running.png" width={20} height={20} alt="training" className="rounded-xl" />
            有氧训练
          </TabsTrigger>
          <TabsTrigger value="anaerobic">
            <Image src="/svg/muscles.svg" width={20} height={20} alt="training" className="rounded-xl" />
            无氧训练
          </TabsTrigger>
        </TabsList>
        <TabsContent value="aerobics">
          <Card>
            <CardContent className="pt-6">
              <AddTrainingForm type="aerobics" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="anaerobic">
          <Card>
            <CardContent className="pt-6">
              <AddTrainingForm type="anaerobic" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddTrainingPage;
