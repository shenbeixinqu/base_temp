from flask import Blueprint, request
from .modules import CMSHouse
from utils.return_methods import success_return, error_return

bp = Blueprint('back', __name__, url_prefix='/back')


@bp.route('/thing_manage')
def thing_manage():
    pn = int(request.values.get("pn", 1))
    limit = int(request.values.get("limit", 10))
    key_word = request.values.get("k_word")
    query_all = CMSHouse.query.offset((pn - 1) * limit).limit(limit).all()
    total = CMSHouse.query.count()
    data = []
    for q in query_all:
        record = {
            "id": q.id,
            "name": q.name,
            "price": q.price,
            "address": q.address,
            "way": q.way,
            "towards": q.towards,
            "floor": q.floor,
            "area": q.area,
            "desc": q.desc,
            "status": q.status,
        }
        data.append(record)
    return success_return(**{"data": data, "total": total})

