'use client';
import { Badge } from '@/components/ui/badge';
import { UserRoundPen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { editUserInfoAction } from '@/actions/user/user';
import { useHandleClientResponse } from '@/hooks/use-response';

interface PhysicalDataForm {
  height: number;
  weight: number;
}

const EditDialog: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const handleClientResponse = useHandleClientResponse<void>();

  const [formData, setFormData] = useState<PhysicalDataForm>({
    height: 170,
    weight: 65,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setOpen(false);
    await handleClientResponse(editUserInfoAction(formData), {
      showSuccessMessage: true,
      successMessage: '保存成功',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑身体数据</DialogTitle>
          <DialogDescription>在这里更新您的身高体重信息</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              身高(cm)
            </Label>
            <Input
              id="height"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              体重(kg)
            </Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            保存更改
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PhysicalData = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className={'relative mb-2 flex h-32 flex-row items-end px-1'}>
        <div onClick={() => setIsOpen(true)} className="absolute right-0 top-0 rounded p-1">
          <UserRoundPen />
        </div>
        {/*体重*/}
        <div className={'flex flex-1 flex-col'}>
          <div className={'flex'}>
            <span className={'ml-[-0.5rem] text-[4rem] tracking-[-0.2rem]'}>130</span>
            <span className={'ml-1 mt-4'}>斤</span>
          </div>
          <span className={'text-sm'}>今天 08:52</span>
        </div>
        {/*对比昨天*/}
        <div className={'mr-20 flex flex-col'}>
          <span className={'mb-[0.5rem] text-right text-[2rem]'}>0.8</span>
          <span className={'text-sm opacity-60'}>对比昨天</span>
        </div>
      </div>
      {/* 细节信息 */}
      <div className={'flex gap-8 rounded-xl bg-[#69B1FF] px-4 py-2'}>
        <div className={'flex flex-col gap-1'}>
          <div className={'flex items-end'}>
            <span className={'mr-1'}>身高</span>
            <Badge className={'text-xs'}>正常</Badge>
          </div>
          <span>210cm</span>
        </div>
        <div className={'flex flex-col gap-1'}>
          <div className={'flex items-end'}>
            <span className={'mr-1'}>BMI</span>
            <Badge className={'text-xs'}>正常</Badge>
          </div>
          <span>20.3</span>
        </div>
      </div>
      <EditDialog open={isOpen} setOpen={setIsOpen} />
    </>
  );
};
export default PhysicalData;
