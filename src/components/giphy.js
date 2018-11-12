
import React from "react";
import injectSheet from "react-jss";
import ReactTable from "react-table";
import 'react-table/react-table.css'

//eslint-disable-next-line
const GIPHY_HOST = 'https://api.giphy.com';
//eslint-disable-next-line
const GIPHY_PATH = '/v1/gifs/search';
const GIPHY_API_KEY = 'ek9Ox3rwGBgrf7meRL371nRmaYd1myXc';
const GIPHY_LIMIT = 100;
const GIPHY_LANG = 'en';
const GIPHY_FORMAT = 'json'


const styles = ({
	root: {
    backgroundColor:"#fff",
  },
  title: {
    font: {
      size: 40,
      weight: 900
    },
  },
  grid: {
    display:"flex",
    flexFlow:"column",
  },
  gridRow: {
	    display:"flex",
	    flexFlow:"row nowrap",
	    padding:10,
	    alignItems:"center",
	  },
  inputPompt:{
	  minWidth:150,
	  textAlign:"right",
	    font: {
	        size: 14,
	        weight: 600
	      },
  },
  inputField:{
      paddingLeft:10,
  },
  reacttable:{
	  maxWidth:700,
  }
});




const GIPHY_COLUMNS = [

	{
	  Header: 'Image',
	  accessor: 'images',
	  maxWidth: 100,
	  filterable: false,
	  className: "tableImage",
	    Cell: row => ( 
	    			<img src={row.value['480w_still'].url} style={{maxWidth:50,maxHeight:50,}}/>
	    			)
	},
	
	{
	  Header: 'Type',
	  accessor: 'type' ,
	  maxWidth: 100,
	}, 
	{
	  Header: 'Title',
	  accessor: 'title',
	  maxWidth: 150,
	}, 
	{
	  Header: 'By',
	  accessor: 'username',
	  maxWidth: 200,
	}, 
	{
	  Header: 'Source',
	  accessor: 'source_tld',
	  maxWidth: 300,
	}, 

]



class Giphy extends React.Component {
	state={};

	  constructor(props) {
	    super(props);

	    this.state = {
				searchTerm:'',
				giphydata:[],
	    };
	    // This binding is necessary to make `this` work in the callback
	    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
	    this.doSearch = this.doSearch.bind(this);
	  }
	  
	  doSearch = () => {
			  const params = {
							  api_key: GIPHY_API_KEY,
							  q: this.state.searchTerm,
							  limit: GIPHY_LIMIT,
							  lang: GIPHY_LANG,
							  fmt: GIPHY_FORMAT,
			  		};
			  

			   const GetParams = [];
			   for (let paramKey in params) {
				   GetParams.push(encodeURIComponent(paramKey) + '=' + encodeURIComponent(params[paramKey]));
			   }
		  		const URL = GIPHY_HOST + GIPHY_PATH + "?" + GetParams.join('&');
			   
		  		fetch( URL )
		  			.then(response => response.json())
		  			.then(data => {
		  				this.setState({ giphydata:data })
		  			});
		  }
	  
	  handleSearchTermChange(event) {
		  this.setState({searchTerm: event.target.value});
	  }

	  render = () => {

			const { classes } = this.props;
			const searchDisabled = this.state.searchTerm.length === 0 ? true : false ;
			
	    return (
	      <article className={classes.root}>
	      	<h1 className={classes.title}>Giphy Search</h1>
	      	<div className={classes.grid}>
	      		<div className={classes.gridRow}>
	      			<div className={classes.inputPompt}>Search Term:</div>
	      			<div className={classes.inputField}><input type={"text"} className={classes.inputSearchTerm} value={this.state.searchTerm} onChange={this.handleSearchTermChange} /></div>
	      		</div>
	      		<div className={classes.gridRow}>
	      			<div className={classes.inputPompt}></div>
	      			<div className={classes.inputField}><input type={"button"} className={classes.inputSearchButton} value={"Start Search"} onClick={this.doSearch} disabled={searchDisabled} /></div>
	      		</div>
	      	</div>
	      	{typeof this.state.giphydata.data !== 'undefined' && this.state.giphydata.data.length > 0 &&
	      					<ReactTable
						        data={this.state.giphydata.data}
	          					filterable
						        columns={GIPHY_COLUMNS}
          						defaultPageSize={5}
	          					className={"-striped -highlight "+classes.reacttable}
						      />}
	      </article>
	    );
	  }
	}

export default injectSheet(styles)(Giphy);