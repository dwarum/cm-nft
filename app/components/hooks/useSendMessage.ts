import { useMutation } from "@tanstack/react-query";

export type TextResponse = {
    text: string;
    user: string;
    attachments?: { url: string; contentType: string; title: string }[];
};

type SendMessageMutationProps = {
    text: string;
    agentId: string;
};

const useSendMessage = () => {
    return useMutation({
        mutationFn: async ({ text, agentId }: SendMessageMutationProps) => {
            const res = await fetch(`http://localhost:3000/${agentId}/message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text, userId: "user" }),
            });

            if (!res.ok) {
                throw new Error(`Failed to send message: ${res.statusText}`);
            }

            return res.json() as Promise<TextResponse[]>;
        },
    });
};

export default useSendMessage;
