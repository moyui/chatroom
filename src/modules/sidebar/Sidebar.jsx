import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { TwitterPicker } from 'react-color';
import * as qiniu from 'qiniu-js';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Switch from 'react-switch';
import ReactLoading from 'react-loading';

import action from '@/state/action';
import socket from '@/socket';
import Avatar from '@/components/Avatar';
import IconButton from '@/components/IconButton';
import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import Message from '@/components/Message';
import OnlineStatus from './OnlineStatus';
import AppDownload from './AppDownload';
import AdminDialog from './AdminDialog';
import setCssVariable from '../../../../utils/setCssVariable';
import readDiskFile from '../../../../utils/readDiskFile';
import playSound from '../../../../utils/sound';
import config from '../../../../config/client';

import './Sidebar.less';