import React, { useState } from 'react';
import { Tag, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const TagList = ({ tags }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [newTags, setNewTags] = useState([]);
  const showInput = () => {
    setInputVisible(true);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];
    if (
      inputValue &&
      !tags.concat(tempsTags).map(({ label }) => label).includes(inputValue)
    ) {
      tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue}];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  }

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {
        inputVisible &&
        <Input
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      }
      {
        !inputVisible &&
        <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined />
        </Tag>
      }
    </div>
  )
}

export default TagList
