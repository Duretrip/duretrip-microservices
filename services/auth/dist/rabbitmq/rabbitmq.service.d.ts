export declare class RabbitmqService {
    private connection;
    private channel;
    constructor();
    private connectToRabbitMQ;
    publishMessage(queueName: string, message: any): Promise<void>;
    consumeMessages(queueName: string, callback: (message: any) => void): Promise<void>;
    waitForResponse(correlationId: string): Promise<any>;
}
