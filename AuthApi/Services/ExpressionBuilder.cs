using AuthApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.Linq.Expressions;
using System.Reflection;

namespace AuthApi.Services;

// A class to build a LINQ expression from a list of filters
public class ExpressionBuilder
{
    // A dictionary to map the operator strings to expression types
    private static readonly Dictionary<string, ExpressionType> Operators = new()
    {
{"=", ExpressionType.Equal},
{"equals", ExpressionType.Equal},
{"is", ExpressionType.Equal},
{"!=", ExpressionType.NotEqual},
{">", ExpressionType.GreaterThan},
{">=", ExpressionType.GreaterThanOrEqual},
{"<", ExpressionType.LessThan},
{"<=", ExpressionType.LessThanOrEqual}
};

    static string Capitalize(string input)
    {
        return input[0].ToString().ToUpper() + input.Substring(1);
    }
    // takes a generic parameter T and a field name as a string
    public static Type? GetType<T>(string field)
    {
        // Get the type of T
        Type t = typeof(T);

        MemberInfo mi = t.GetMember(Capitalize(field))[0];

        // If the member is a field, return its type
        if (mi is FieldInfo fi)
        {
            return fi.FieldType;
        }

        // If the member is a property, return its type
        if (mi is PropertyInfo pi)
        {
            return pi.PropertyType;
        }

        // If the member is a method, return its return type
        if (mi is MethodInfo info)
        {
            return info.ReturnType;
        }

        // Otherwise, return null
        return null;

    }

    // build a LINQ expression from a list of filters
    public static Expression<Func<T, bool>>? Build<T>(List<FilterItem>? filters)
    {

        // Get the parameter expression for the type T (e.g. x => ...)
        var parameter = Expression.Parameter(typeof(T), "x");

        // Initialize the expression body as null
        Expression body = null;

        // Loop through the filters and combine them with AND logic
        foreach (var filter in filters)
        {
            if (!filter.Value.IsNullOrEmpty())
            {
                var property = Expression.Property(parameter, filter.Field);

                var type = GetType<T>(filter.Field);
                var value = Expression.Constant(Convert.ChangeType(filter.Value, type));

                var operatorType = Operators[filter.Operator];

                var condition = Expression.MakeBinary(operatorType, property, value);

                if (body == null)
                {
                    body = condition;
                }
                else
                {
                    body = Expression.AndAlso(body, condition);
                }
            }
            if (body != null)
            {
                return Expression.Lambda<Func<T, bool>>(body, parameter);
            }

            // Return the lambda expression for the type T and the body (e.g. x => x.Key == 42 && x.Value > 10)
        }
        return null;
    }
}
