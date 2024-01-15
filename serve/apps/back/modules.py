from exts import db


# 房屋表
class CMSHouse(db.Model):
    __tablename__ = "cms_house"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100))
    # 月租价格
    price = db.Column(db.Integer)
    # 押金
    deposit = db.Column(db.Integer)
    # 小区
    community = db.Column(db.String(200))
    # 地址
    address = db.Column(db.String(100))
    # 租赁方式
    way = db.Column(db.Integer)  # 1 月租  2 年租
    # 朝向
    towards = db.Column(db.Integer)  # 1 东西 2 南北
    # 楼层
    floor = db.Column(db.Integer)
    # 面积
    area = db.Column(db.Float)
    # 简介
    desc = db.Column(db.String(200))
    # 联系电话
    mobile = db.Column(db.String(100))
    # 状态
    status = db.Column(db.Integer, default=0)  # 0 上架 1 下架
