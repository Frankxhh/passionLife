'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useXAgent, useXChat, Sender, Bubble, Welcome, Prompts } from '@ant-design/x';
import { Bot } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { client, prompts, roles } from './config';

const AiChatContent: React.FC = () => {
  const [agent] = useXAgent({
    request: (info, callbacks) => {
      (async () => {
        {
          const { message } = info;
          const { onSuccess, onUpdate, onError } = callbacks;

          let content = '';

          try {
            const stream = await client.chat.completions.create({
              model: 'qwq-plus',
              messages: [
                {
                  role: 'system',
                  content: '你是一名专业的健身教练和营养师，你的名字叫做Cal LightMan，请根据用户的问题给出回答。',
                },
                { role: 'user', content: message ?? '' },
              ],
              stream: true,
            });

            for await (const chunk of stream) {
              content += chunk.choices[0]?.delta?.content ?? '';
              onUpdate(content);
            }

            onSuccess(content);
          } catch (error) {
            onUpdate('服务器繁忙');
            console.log('error', error);
          }
        }
      })();
    },
  });

  const { onRequest, messages } = useXChat({ agent });

  const items = messages.map(({ message, id, status }) => {
    console.log(message, status);
    return {
      key: id,
      role: status === 'local' ? 'user' : 'system',
      content: message,
      loading: message === '',
    };
  });

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (value: string) => {
    setSearchValue('');
    onRequest(value);
  };

  const mainRender = useMemo(() => {
    if (items.length === 0) {
      return (
        <ScrollArea className="w-full rounded-md">
          <Welcome
            style={{
              backgroundImage: 'linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)',
              borderStartStartRadius: 4,
            }}
            icon={<Bot />}
            title="你好，我是你的私人健身教练"
            description="我可以帮助你制定健身计划，解答健身问题，提供营养建议。"
          />
          <Prompts
            className="my-4"
            title="✨ 一些有用的建议 也许你会感兴趣"
            items={prompts}
            styles={{ item: { width: '100%' } }}
            onItemClick={info => {
              onRequest(info.data.description as string);
            }}
            wrap
          />
        </ScrollArea>
      );
    }
    return <Bubble.List className="h-full" autoScroll roles={roles} items={items} />;
  }, [items]);

  return (
    <>
      {mainRender}
      <Sender
        value={searchValue}
        onChange={setSearchValue}
        allowSpeech
        className="bottom-0 left-0 right-0"
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AiChatContent;
