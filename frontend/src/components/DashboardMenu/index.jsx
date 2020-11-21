import { Formik } from 'formik';
import { Button, Input, Select } from '@chakra-ui/react';

export function DashboardMenu({
  history,
  guildId,
  user,
  roles,
  config,
  updatePrefix,
  updateRole
}) {

  const defaultRoleId = config.defaultRole ? config.defaultRole : ""
  return (
    <div>
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
    <Formik
      initialValues={{ defaultRole: defaultRoleId }}
      onSubmit={({defaultRole}) => {updateRole(defaultRole)}}
    >
      {
        (props) => (
          <form onSubmit={props.handleSubmit}>
            <Select name="defaultRole" defaultValue={defaultRoleId} onChange={props.handleChange}>
              {roles.map((role, key) => (
                <option value={role.id} key={key}>{role.name}</option>
              ))}
            </Select>
            <Button colorScheme="orange" type="submit" children="Update Role" />
          </form>
        )
      }
    </Formik>
  </div>
  )
}