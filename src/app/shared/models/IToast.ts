import { Record } from 'immutable';
export const ToastRecord = Record({
  message: 'Test Message',
  type: 'SUCCESS'
});

export class ToastRecordClass extends ToastRecord {
  message;
  type;
  constructor(props) {
    super(props);
  }
}
