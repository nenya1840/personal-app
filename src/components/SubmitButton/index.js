import React from 'react';
import { Form, Button } from 'antd';
import styles from './index.module.less';

const SubmitButton = (props) => {
  const { children } = props;
  return (
    <Form.Item>
      <Button className={styles.submit} type="primary" size="large" htmlType="submit">
        {children}
      </Button>
    </Form.Item>
  )
}

export default SubmitButton;
