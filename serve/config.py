
class Config(object):
    DEBUG = True
    DB_USERNAME = "root"
    DB_PASSWORD = "123456"
    # DB_HOST = "10.1.1.181"
    # DB_HOST = "127.0.0.1"
    DB_HOST = "localhost"
    DB_PORT = "3306"
    DB_NAME = 'house'
    DB_URI = 'mysql+pymysql://%s:%s@%s:%s/%s?charset=utf8' % (DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME)

    SQLALCHEMY_DATABASE_URI = DB_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False

configs = {
    'default': Config
}