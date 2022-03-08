import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Public } from "./entities/public.entity"

@EventSubscriber()
export class PublicSubscriber implements EntitySubscriberInterface<Public> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Public;
    }

    beforeInsert(event: InsertEvent<Public>) {
        console.log(`BEFORE PUBLIC INSERTED: `, event.entity);
    }
}
