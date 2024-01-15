from flask import Flask
from exts import db
from config import configs
from flask_cors import CORS


def create_app():
    config_name = "default"
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(configs[config_name])
    db.init_app(app)
    from apps.back import bp as back_bp
    app.register_blueprint(back_bp)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(port=5002, host="0.0.0.0")
