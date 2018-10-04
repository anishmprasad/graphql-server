const axios = require('axios')
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// Hardcoded customer data

// const customers  = [
//   {id : "1" , name : "anish" , email:"anishmprasad@gmail.com",age :28},
//   { id: "2", name: "nija", email: "nijabhagyanath@gmail.com", age: 28 },
//   { id: "3", name: "nisha", email: "nishapriyajith@gmail.com", age: 35 },
//   { id: "4", name: "adarsh", email: "adarsh@gmail.com", age: 10 },
//   { id: "5", name: "priyajith", email: "priyajith@gmail.com", age: 45 },
//   { id: "6", name: "sunitha", email: "sunitha@gmail.com", age: 58 },
//   { id: "7", name: "prasad", email: "prasad@gmail.com", age: 62 },
  
// ]
// CustomerType

const CustomerType = new GraphQLObjectType({
  name : "Customer",
  fields : () => ({
    id : {type:GraphQLString},
    name :{type:GraphQLString},
    email :{type:GraphQLString}
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name : 'RootQueryType',
  fields : {
    customer: {
      type: CustomerType,
      args: {
        id: { type :GraphQLString }
      },
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers' + args.id)
        .then(res => res.data )
      }
    },
    customers:{
      type: new GraphQLList(CustomerType),
      resolve(parentValue,args) {
        return axios.get('http://localhost:3000/customers')
          .then(res => res.data)
      }
    }
  }
})

// Root Query
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer:{
      type:CustomerType,
      args:{
        name:{ type:new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }        
      },
      resolve(parentValue,args){
        return axios.post("http://localhost:3000/customers",{
          name : args.name,
          email : args.email,
          age : args.age
        })
        .then(res => res.data)
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios.delete("http://localhost:3000/customers" + args.id)
          .then(res => res.data)
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },        
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt  }
      },
      resolve(parentValue, args) {
        return axios.patch("http://localhost:3000/customers", {
          name: args.name,
          email: args.email,
          age: args.age
        })
          .then(res => res.data)
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query : RootQuery
})