from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import BadSignature, SignatureExpired
from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()
# 密钥，可随意修改
SECRET_KEY = 'abcdefghijklmm'


# 生成token, 有效时间为1min
def generate_auth_token(user_id, expiration=60):
    s = Serializer(SECRET_KEY, expires_in=expiration)
    return s.dumps({'user_id': user_id})


# 解析token
def verify_auth_token(token):
    s = Serializer(SECRET_KEY)
    # token正确
    try:
        data = s.loads(token)
        return data
    # token过期
    except SignatureExpired:
        return None
    # token 错误
    except BadSignature:
        return None


# 验证token
@auth.verify_password
def verify_password(username, password):
    # 先验证token
    token_exist = verify_auth_token(username)
    # 如果token不存在, 验证用户与密码是否匹配
    if not token_exist:
        pass
    return True
