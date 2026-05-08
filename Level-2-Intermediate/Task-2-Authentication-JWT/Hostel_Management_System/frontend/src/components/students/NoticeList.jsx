//Hostel_Management_System\frontend\src\components\students\NoticeList.jsx
const NoticeList = ({ notices }) => (
  <div>
    <h3>📣 Notices</h3>
    {notices.map(n => (
      <div key={n._id}>
        <h4>{n.title}</h4>
        <p>{n.message}</p>
      </div>
    ))}
  </div>
);

export default NoticeList;
