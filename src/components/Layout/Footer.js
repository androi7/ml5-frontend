import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'


const Footer = (props) => {

  return (
    <AppBar position='static' >
      <Tabs
        value={1}
        indicatorColor='secondary'
        textColor='secondary'
        variant={'standard'}
        centered={true}
      >

        <Tab label="Profile" />
        <Tab label="Video" />
        <Tab label="Chat" />
      </Tabs>
    </AppBar>
  );
};


export default Footer;
//
// class Footer extends Component {
//   muscles = this.getMuscles()
//
//   getMuscles () {
//     return [ '', ...this.props.muscles ]
//   }
//
//   onIndexSelect = (e, index) => {
//     this.props.onCategorySelect(this.muscles[index])
//   }
//
//   getIndex = () => {
//     return this.muscles.indexOf(this.props.category)
//   }
//
//   render () {
//     const { width } = this.props
//     const isMobile = width === 'xs'
//
//     return (
//       <AppBar position='static'>
//         <Tabs
//           value={this.getIndex()}
//           onChange={this.onIndexSelect}
//           indicatorColor='secondary'
//           textColor='secondary'
//           variant={isMobile ? 'scrollable' : 'standard'}
//           centered={!isMobile}
//         >
//           {this.muscles.map(group =>
//             <Tab key={group} label={group || 'All'} />
//           )}
//         </Tabs>
//       </AppBar>
//     )
//   }
// }
//
// export default compose(
//   withContext,
//   withWidth()
// )(Footer)
