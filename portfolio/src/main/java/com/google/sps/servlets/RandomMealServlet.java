// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns a random meal. */
@WebServlet("/random-meal")
public final class RandomMealServlet extends HttpServlet {

  private List<String> meals;

  @Override
  public void init() {
    meals = new ArrayList<>();
    meals.add("Fettucine Alfredo");
    meals.add("BBQ Bacon Burger with fries and a shake");
    meals.add("Arroz con Frijoles");
    meals.add("Arroz con Pollo");
    meals.add("Quesadillas");
    meals.add("Pancakes and Bacon");
    meals.add("Five Cheese Ziti");
    meals.add("Grilled Cheese and Tomato Soup");
    meals.add("BBQ Pulled Pork and Mac n Cheese");
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String meal = meals.get((int) (Math.random() * meals.size()));

    response.setContentType("text/html;");
    response.getWriter().println(meal);
  }
}