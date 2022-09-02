import logging
import asyncio

from hbmqtt.client import MQTTClient
from hbmqtt.mqtt.constants import QOS_1

from database import update_trash_can

logger = logging.getLogger(__name__)

@asyncio.coroutine
def get_message():
    client = MQTTClient()
    yield from client.connect('mqtt://test.mosquitto.org')
    yield from client.subscribe([
        ("SmartTrash/can", QOS_1)
    ])
    logger.info('Client subscribed')
    try:
        while True:
            message = yield from client.deliver_message()
            packet = message.publish_packet
            decodedMessage = packet.payload.data.decode('utf-8')
            can_id, level = decodedMessage.split(' ')
            update_trash_can(can_id, float(level))
            logging.info(f'Trash can with id {can_id} updated to {level}')
    except Exception as error:
        logging.error(f'Exeption ocurred: {error}')

if __name__ == '__main__':
    formatter = '[%(asctime)s :: (%(name)s) "%(message)s"]'
    logging.basicConfig(level=logging.INFO, format=formatter)
    
    asyncio.get_event_loop().run_until_complete(get_message())
    asyncio.get_event_loop().run_forever()
