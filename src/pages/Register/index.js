import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'redux-react-hook';
import { Form, Popover, Progress, Select, Row, Col } from 'antd';
import InputItem from '../../components/InputItem';
import SubmitButton from '../../components/SubmitButton';
import { getCaptcha, register } from '../../actions/account';
import styles from './index.module.less';

const { Option } = Select;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      强度：强
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      强度：中
    </div>
  ),
  poor: (
    <div className={styles.error}>
      强度：太短
    </div>
  ),
}

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
}

const Register = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [popover, setPopover] = useState(false);
  const [prefix, setPrefix] = useState('86');
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    dispatch(register(values));
  }
  const checkConfirm = (_, value) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配');
    }
    return promise.resolve();
  }
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  }
  const checkPassword = (_, value) => {
    const promise = Promise;
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码');
    }
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value && form.getFieldValue('confirm')) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  }

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length && (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          className={styles.progress}
          status={passwordProgressMap[passwordStatus]}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    )
  }

  const handleClickCaptcha = () => {
    form.validateFields(['username', 'email', 'password'])
      .then(() => {
        dispatch(getCaptcha(form.getFieldsValue(['username', 'email', 'password'])))
      })
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.register}>
        <Form
          form={form}
          onFinish={handleFinish}
        >
          <InputItem
            name="username"
            placeholder="用户名"
            size="large"
            rules={[
              {
                required: true,
                message: '请输入用户名！'
              }
            ]}
          />
          <InputItem
            name="email"
            placeholder="邮箱"
            size="large"
            rules={[
              {
                required: true,
                message: '请输入邮箱！'
              },
              {
                type: 'email',
                message: '请填写正确的邮箱格式！'
              },
            ]}
          />
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode;
              }
              return document.body;
            }}
            content={
              visible && (
                <div>
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div>
                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <InputItem
              name="password"
              type="password"
              placeholder="至少6位密码，区分大小写"
              size="large"
              rules={[
                {
                  validator: checkPassword,
                }
              ]}
            />
          </Popover>
          <InputItem
            name="confirm"
            type="password"
            placeholder="确认密码"
            size="large"
            rules={[
              {
                required: true,
                message: '请确认密码！'
              },
              {
                validator: checkConfirm,
              }
            ]}
          />
          <Row>
            <Col span={6}>
              <Select
                size="large"
                value={prefix}
                onChange={(value) => setPrefix(value)}
                style={{ width: '100%' }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
            </Col>
            <Col span={18}>
              <InputItem
                name="mobile"
                placeholder="手机号"
                size="large"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！'
                  },
                  {
                    pattern: /^\d{11}$/,
                    message: '手机号格式错误！'
                  }
                ]}
              />
            </Col>
          </Row>
          <InputItem
            name="captcha"
            size="large"
            rules={[
              {
                required: true,
                message: '请输入验证码'
              }
            ]}
            placeholder="验证码"
            onClick={handleClickCaptcha}
          />
          <Row justify="space-between" align="middle">
            <Col span={8}>
              <SubmitButton>注册</SubmitButton>
            </Col>
            <Col span={16}>
              <Link className={styles.login} to="/login">
                使用已有账户登录
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
};

export default Register;