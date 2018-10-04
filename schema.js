const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// Hardcoded customer data

const customers  = [
  {id : "1" , name : "anish" , email:"anishmprasad@gmail.com",age :28},
  { id: "2", name: "nija", email: "nijabhagyanath@gmail.com", age: 28 },
  { id: "3", name: "nisha", email: "nishapriyajith@gmail.com", age: 35 },
  { id: "4", name: "adarsh", email: "adarsh@gmail.com", age: 10 },
  { id: "5", name: "priyajith", email: "priyajith@gmail.com", age: 45 },
  { id: "6", name: "sunitha", email: "sunitha@gmail.com", age: 58 },
  { id: "7", name: "prasad", email: "prasad@gmail.com", age: 62 },
  
]
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
        for (let i = 0; i < customers.length; i += 1) {
          if (customers[i].id == args.id) {
            return customers[i]
          }
        }
      }
    },
    customers:{
      type: new GraphQLList(CustomerType),
      resolve(parentValue,args) {
        return customers
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query : RootQuery
})