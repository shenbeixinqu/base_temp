import json
from flask import Blueprint, request
from .modules import CMSHouse
from utils.return_methods import success_return, error_return
from exts import db

bp = Blueprint('back', __name__, url_prefix='/back')


@bp.route('/thing_manage')
def thing_manage():
    pn = int(request.values.get("pn", 1))
    limit = int(request.values.get("limit", 10))
    key_word = request.values.get("k_word")
    query_all = CMSHouse.query.filter(CMSHouse.name.contains(key_word)).offset((pn - 1) * limit).limit(limit).all()
    total = CMSHouse.query.count()
    data = []
    for q in query_all:
        record = {
            "id": q.id,
            "name": q.name,
            "price": q.price,
            "deposit": q.deposit,
            "community": q.community,
            "address": q.address,
            "way": q.way,
            "towards": q.towards,
            "floor": q.floor,
            "area": q.area,
            "desc": q.desc,
            "mobile": q.mobile,
            "status": q.status,
        }
        data.append(record)
    return success_return(**{"data": data, "total": total})


@bp.route('/thing_edit', methods=['GET', 'POST'])
def thing_edit():
    data = request.get_data()
    data = json.loads(data)
    print('data', data)

    name = data['name']
    price = data['price']
    deposit = data['deposit']
    address = data['address']
    way = data['way']
    towards = data['towards']
    floor = data['floor']
    area = data['area']
    status = data['status']
    try:
        community = data['community']
    except:
        community = ""
    try:
        desc = data['desc']
    except:
        desc = ""
    try:
        mobile = data['mobile']
    except:
        mobile = ""
    if data['id']:
        h_id = data['id']
        house = CMSHouse.query.get(h_id)
        house.name = name
        house.price = price,
        house.deposit = deposit,
        house.community = community,
        house.address = address,
        house.way = way,
        house.towards = towards,
        house.floor = floor,
        house.area = area,
        house.desc = desc,
        house.mobile = mobile,
        house.status = status
    else:
        house = CMSHouse(
            name=name,
            price=price,
            deposit=deposit,
            community=community,
            address=address,
            way=way,
            towards=towards,
            floor=floor,
            area=area,
            desc=desc,
            mobile=mobile,
            status=status
        )
        db.session.add(house)
    db.session.commit()
    return success_return()


@bp.route('/thing_del', methods=['GET', 'POST'])
def thing_del():
    get_data = json.loads(request.get_data())
    print('11111', get_data)
    ids = get_data['ids']
    for h_id in ids:
        house = CMSHouse.query.get(h_id)
        db.session.delete(house)
    db.session.commit()
    return success_return()
