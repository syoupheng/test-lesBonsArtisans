module.exports = {
  productInsertSchema: {
    name: {
      notEmpty: true,
      errorMessage: "The name is required !"
    },
  
    type: {
      notEmpty: true,
      errorMessage: "The type is required !"
    },
  
    price: {
      notEmpty: true,
      isCurrency: {
        options: { min: 0 },
        errorMessage: "The price is a currency !"
      }
    },
  
    rating: {
      isFloat: {
        options: { min: 0, max: 5 },
        errorMessage: "The rating is a number between 0 and 5 !"
      }
    },
  
    warranty_years: {
      optional: true,
      isInt: {
        options: { min: 0 },
        errorMessage: "The number of warrant years should be a positive integer !"
      }
    },
  
    available: {
      optional: true,
      isBoolean: {
        errorMessage: "This value should be true or false !"
      }
    }
  },
  
  productUpdateSchema: {
    name: {
      optional: true,
      notEmpty: true,
      errorMessage: "The name is required !"
    },
  
    type: {
      optional: true,
      notEmpty: true,
      errorMessage: "The type is required !"
    },
  
    price: {
      optional: true,
      notEmpty: true,
      isCurrency: {
        options: { min: 0 },
        errorMessage: "The price is a currency !"
      }
    },
  
    rating: {
      optional: true,
      isFloat: {
        options: { min: 0, max: 5 },
        errorMessage: "The rating is a number between 0 and 5 !"
      }
    },
  
    warranty_years: {
      optional: true,
      isInt: {
        options: { min: 0 },
        errorMessage: "The number of warrant years should be a positive integer !"
      }
    },
  
    available: {
      optional: true,
      isBoolean: true
    }
  }
}
