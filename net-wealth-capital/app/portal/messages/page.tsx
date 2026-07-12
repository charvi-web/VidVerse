"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { conversation, messageThreads } from "@/lib/mock";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [selectedThread, setSelectedThread] = useState(messageThreads[0]?.id ?? "");
  const [message, setMessage] = useState("");
  const activeThread = messageThreads.find((thread) => thread.id === selectedThread) ?? messageThreads[0];

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" description="Secure conversations with your advisory team." />

      <div className="grid min-h-[640px] gap-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {messageThreads.map((thread) => {
              const active = thread.id === selectedThread;
              return (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => setSelectedThread(thread.id)}
                  className={cn(
                    "flex w-full gap-3 rounded-lg p-3 text-left transition-colors hover:bg-secondary",
                    active && "bg-secondary"
                  )}
                >
                  <Avatar name={thread.from} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground">{thread.from}</span>
                      <span className="text-xs text-muted-foreground">{thread.time}</span>
                    </span>
                    <span className="block text-xs text-muted-foreground">{thread.role}</span>
                    <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{thread.preview}</span>
                  </span>
                  {thread.unread && <span className="mt-2 size-2 rounded-full bg-primary" />}
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="flex min-h-[640px] flex-col">
          <CardHeader className="border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar name={activeThread.from} />
              <div>
                <CardTitle>{activeThread.from}</CardTitle>
                <p className="text-sm text-muted-foreground">{activeThread.role}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 overflow-y-auto pt-6">
            {conversation.map((item, index) => {
              const client = item.from === "client";
              return (
                <div key={`${item.time}-${index}`} className={cn("flex", client ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[80%] rounded-2xl px-4 py-3", client ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
                    <div className="mb-1 flex items-center gap-2 text-xs opacity-80">
                      <span>{client ? "You" : item.name}</span>
                      <span>{item.time}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="border-t border-border pt-6">
            <div className="flex w-full gap-3">
              <Textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write a message..."
                className="min-h-12"
              />
              <Button className="self-end">
                <MessageSquare className="size-4" /> Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
