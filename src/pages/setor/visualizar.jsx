import MenuHeader from '../../../components/menu/menuHeader';

class Visualizar extends Component{

    render(){

        return (
            <section className="content">
                <MenuHeader title={`Setores Cadastrados`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                    </div>
                </div>
            </section>  
        )

    }

}


/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ setor: state.setor })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);