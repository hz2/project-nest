import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Menu } from "./entities/menu.entity";

@EventSubscriber()
export class MenuSubscriber implements EntitySubscriberInterface<Menu> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Menu;
    }

    beforeInsert(event: InsertEvent<Menu>) {
        console.log(`BEFORE Menu INSERTED: `, event.entity);
    }
}
