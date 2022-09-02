from pymongo.mongo_client import MongoClient
from bson.objectid import ObjectId
from bson.timestamp import Timestamp
from datetime import datetime

def connect():
    client = MongoClient("mongodb+srv://davifelix:teste123@datapan.obog7.mongodb.net/?retryWrites=true&w=majority")
    database = client["smart-trash"]
    data = database['trash-cans']
    return data


def update_trash_can(can_id, level):
    status = None

    if level < 1/3:
        status = "low"
    elif level < 2/3:
        status = "medium"
    else:
        status = "high"

    collection = connect()
    collection.update_one(
        {"_id": ObjectId(can_id)}, 
        {
            "$push": {
                "historic": {
                    "level": level,
                    "date": datetime.today().replace(microsecond=0)
                }
            },
            "$set": {
                "level": level,
                "status": status,
            },
        }
    )
