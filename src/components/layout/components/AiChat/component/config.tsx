import { type PromptsProps } from '@ant-design/x';
import { type RolesType } from '@ant-design/x/es/bubble/BubbleList';
import { Bot, CircleAlert, Info, Lightbulb, Rocket, Smile, User } from 'lucide-react';
import OpenAI from 'openai';
import { env } from '@/env';
export const client = new OpenAI({
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const roles: RolesType = {
  system: {
    placement: 'start',
    avatar: { icon: <Bot />, style: { background: '#fde3cf' } },
    typing: { step: 5, interval: 20 },
    style: {
      maxWidth: 600,
    },
  },
  user: {
    placement: 'end',
    avatar: { icon: <User />, style: { background: '#87d068' } },
  },
};

export const prompts: PromptsProps['items'] = [
  {
    key: '1',
    icon: <Lightbulb color="#FFD700" />,
    label: '拼命三郎综合征',
    description: '为什么第一天猛练后连楼梯都下不了？',
  },
  {
    key: '2',
    icon: <Info color="#1890FF" />,
    label: '卡路里数学不及格',
    description: '练完吨吨喝奶茶吃炸鸡，真以为运动能抵消热量？钱包都瘦了，肉肉为何稳如泰山？',
  },
  {
    key: '3',
    icon: <Rocket color="#722ED1" />,
    label: '姿势妖娆伤不起',
    description: '深蹲像鞠躬谢幕、平板扭成麻花，到底什么是正确的姿势？',
  },
  {
    key: '4',
    icon: <Smile color="#52C41A" />,
    label: '幻想速成马甲线',
    description: '三天没变健身博主同款身材,问题到底出在哪里？',
  },
  {
    key: '5',
    icon: <CircleAlert color="#FF4D4F" />,
    label: '冷启动的悲剧',
    description: '跳过热身直接举铁，听到关节"嘎吱"响，热身到底有多重要？',
  },
];
