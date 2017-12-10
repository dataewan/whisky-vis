import React from 'react'

class Information extends React.Component {
  render() {
    const { selected } = this.props
    const distillery = selected ? selected.Distillery : ''
    const postcode = selected ? selected.Postcode : ''
    return (
      <div className='information'>
        <table>
          <tbody>
            <tr>
              <td>Distillery</td>
              <td>{distillery}</td>
            </tr>
            <tr>
              <td>Postcode</td>
              <td>{postcode}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Information;
