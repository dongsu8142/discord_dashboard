import { Formik } from 'formik';
import { Button, Input, Select, Switch, Textarea } from '@chakra-ui/react';

export function DashboardMenu({
  roles,
  config,
  channels,
  updatePrefix,
  updateRole,
  updateJoinChannel,
  updateLeaveChannel,
}) {

  const defaultRoleId = config.defaultRole ? config.defaultRole : ""
  const joinMemberChannelId = config.joinMemberChannel
  const defaultRoleOn = config.defaultRoleOn
  const joinMemberChannelOn = config.joinMemberChannelOn
  const joinMemberChannelMessage = config.joinMemberChannelMessage
  const leaveMemberChannelId = config.leaveMemberChannel
  const leaveMemberChannelOn = config.leaveMemberChannelOn
  const leaveMemberChannelMessage = config.leaveMemberChannelMessage
  return (
    <div className="grid-item">
      <span>prefix</span>
      <Formik
      initialValues={{ prefix: config.prefix }}
      onSubmit={({ prefix }) => {
        updatePrefix(prefix);
      }}
      >
        {
          (props) => (
            <form onSubmit={props.handleSubmit}>
              <Input type="text" name="prefix" onChange={props.handleChange} defaultValue={config.prefix} />
              <Button type="submit" colorScheme="orange" children="Update Prefix" />
            </form>
          )
        }
    </Formik>
    <br />
    <span>defaultRole</span>
    <Formik
      initialValues={{ defaultRole: defaultRoleId, defaultRoleOn: defaultRoleOn }}
      onSubmit={({defaultRole, defaultRoleOn}) => {updateRole(defaultRole, defaultRoleOn)}}
    >
      {
        (props) => (
          <form onSubmit={props.handleSubmit}>
            <Switch size="lg" defaultIsChecked={defaultRoleOn} onChange={props.handleChange} name="defaultRoleOn" />
            <Select className="form-control" id="inputState" name="defaultRole" defaultValue={defaultRoleId} onChange={props.handleChange}>
              {roles.map((role, key) => (
                <option value={role.id} key={key}>{role.name}</option>
              ))}
            </Select>
            <Button colorScheme="orange" type="submit" children="Update Role" />
          </form>
        )
      }
    </Formik>
    <br />
    <span>Send a message when a user joins the server</span>
    <Formik
      initialValues={{ joinMemberChannel: joinMemberChannelId, joinMemberChannelOn: joinMemberChannelOn, joinMemberChannelMessage: joinMemberChannelMessage }}
      onSubmit={({joinMemberChannel, joinMemberChannelOn, joinMemberChannelMessage}) => {updateJoinChannel(joinMemberChannel, joinMemberChannelOn, joinMemberChannelMessage)}}
    >
     {
       (props) => (
         <form onSubmit={props.handleSubmit}>
           <Switch size="lg" defaultIsChecked={joinMemberChannelOn} onChange={props.handleChange} name="joinMemberChannelOn" />
           <Select className="form-control" id="inputState" name="joinMemberChannel" defaultValue={joinMemberChannelId} onChange={props.handleChange}>
              {channels.map((channel, key) => (
                <option value={channel.id} key={key}>{channel.name}</option>
              ))}
            </Select>
            <Textarea name="joinMemberChannelMessage" defaultValue={joinMemberChannelMessage} onChange={props.handleChange}></Textarea>
            <Button colorScheme="orange" type="submit" children="Update Join Channel" />
         </form>
       )
     } 
    </Formik>
    <br />
    <span>Send a message when a user leaves the server</span>
    <Formik
      initialValues={{ leaveMemberChannel : leaveMemberChannelId, leaveMemberChannelOn: leaveMemberChannelOn, leaveMemberChannelMessage: leaveMemberChannelMessage }}
      onSubmit={({leaveMemberChannel, leaveMemberChannelOn, leaveMemberChannelMessage}) => {updateLeaveChannel(leaveMemberChannel, leaveMemberChannelOn, leaveMemberChannelMessage)}}
    >
     {
       (props) => (
         <form onSubmit={props.handleSubmit}>
           <Switch size="lg" defaultIsChecked={leaveMemberChannelOn} onChange={props.handleChange} name="leaveMemberChannelOn" />
           <Select className="form-control" id="inputState" name="leaveMemberChannel" defaultValue={leaveMemberChannelId} onChange={props.handleChange}>
              {channels.map((channel, key) => (
                <option value={channel.id} key={key}>{channel.name}</option>
              ))}
            </Select>
            <Textarea name="leaveMemberChannelMessage" defaultValue={leaveMemberChannelMessage} onChange={props.handleChange}></Textarea>
            <Button colorScheme="orange" type="submit" children="Update Leave Channel" />
         </form>
       )
     } 
    </Formik>


  </div>
  )
}