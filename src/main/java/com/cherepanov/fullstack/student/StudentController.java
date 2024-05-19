/**
 * @author Illia Cherepanov
 * <p>
 * Copyright (c) 1994, 2022, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 * <p>
 * This software is the confidential and proprietary information of Sun
 * Microsystems, Inc. ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Sun.
 * <p>
 * SUN MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY OF
 * THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE, OR NON-INFRINGEMENT. SUN SHALL NOT BE LIABLE FOR
 * ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
 * DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */

package com.cherepanov.fullstack.student;

import com.cherepanov.fullstack.dto.AddUserDto;
import com.cherepanov.fullstack.exception.BadRequestException;
import com.cherepanov.fullstack.exception.StudentNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

/**
 * @author Illia Cherepanov
 * created 20.02.2024
 * @version 1.0
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/v1/students")
public class StudentController {

    private final Logger LOG = LoggerFactory.getLogger(StudentController.class);

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudent() {
        return studentService.getAllStudents();
    }

    @PostMapping("/register")
    public void addStudent(@Valid @RequestBody AddUserDto addUserDto,
                           BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                throw new BadRequestException(error.getDefaultMessage());
            }
        }
        studentService.addStudent(addUserDto.toStudent());
    }

    @DeleteMapping("/delete")
    public void deleteStudent(@RequestBody Long studentId) {
        if (Objects.isNull(studentService.findStudentById(studentId))) {
            throw new StudentNotFoundException("No such student!");
        }
        studentService.deleteStudentById(studentId);
    }


}
